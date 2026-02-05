import React, { useState, useEffect, useMemo } from 'react';
import { format, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';
import { AppState, LogEntry, ActivityType, FeedingType, FeedingSide } from '../types';
import { formatDuration, exportToCSV, ExportColumn, generateId } from '../utils';
import { TrashIcon, MilkIcon, MoonIcon, BabyIcon, PencilIcon, PumpIcon, FoodIcon, ListIcon, CalendarIcon } from './Icons';
import Timeline from './Timeline';

interface HistoryProps {
  logs: LogEntry[];
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const History: React.FC<HistoryProps> = ({ logs, setAppState }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Filter State
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');
  const [filterType, setFilterType] = useState<ActivityType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [logsToExport, setLogsToExport] = useState<LogEntry[]>([]);
  const [exportColumns, setExportColumns] = useState<ExportColumn[]>([
    { key: 'id', label: 'Log ID', enabled: false, value: (l) => l.id },
    { key: 'type', label: 'Activity Type', enabled: true, value: (l) => l.type },
    { key: 'start', label: 'Start Time', enabled: true, value: (l) => format(new Date(l.startTime), 'yyyy-MM-dd HH:mm:ss') },
    { key: 'end', label: 'End Time', enabled: true, value: (l) => l.endTime ? format(new Date(l.endTime), 'yyyy-MM-dd HH:mm:ss') : '' },
    { key: 'duration', label: 'Duration (s)', enabled: true, value: (l) => (l.durationSeconds || 0).toString() },
    { key: 'details', label: 'Details (Summary)', enabled: true, value: (l) => {
        let det = [];
        if (l.details.feedingType) det.push(l.details.feedingType);
        if (l.details.side) det.push(l.details.side);
        if (l.details.amountMl) det.push(`${l.details.amountMl}ml`);
        if (l.details.diaperState) det.push(l.details.diaperState);
        return det.join('; ');
    }},
    { key: 'notes', label: 'Notes', enabled: true, value: (l) => `"${(l.details.notes || '').replace(/"/g, '""')}"` }
  ]);
  
  // Edit Form State
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editType, setEditType] = useState<ActivityType>('feeding');
  const [editDetails, setEditDetails] = useState<LogEntry['details']>({});
  const [newFoodInput, setNewFoodInput] = useState('');

  // Clear delete confirmation state when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => setDeletingId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const toLocalISO = (timestamp: number) => {
    const d = new Date(timestamp);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  const handleDeleteClick = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    const targetId = String(id);
    if (deletingId === targetId) {
      await deleteDoc(doc(db, 'logs', targetId));
      setDeletingId(null);
    } else {
      setDeletingId(targetId);
    }
  };

  const handleEditClick = (log: LogEntry) => {
    if (deletingId) {
      setDeletingId(null);
      return;
    }
    setEditingLog(log);
    setIsCreating(false);
    setEditStartTime(toLocalISO(log.startTime));
    setEditEndTime(log.endTime ? toLocalISO(log.endTime) : '');
    setEditType(log.type);
    setEditDetails({ ...log.details });
  };

  const handleCreateClick = () => {
      const now = Date.now();
      const newLog: LogEntry = {
          id: generateId(),
          type: 'feeding',
          startTime: now,
          details: {}
      };
      setEditingLog(newLog);
      setIsCreating(true);
      setEditStartTime(toLocalISO(now));
      setEditEndTime('');
      setEditType('feeding');
      setEditDetails({});
  };

  const saveEdit = async () => {
    if (!editingLog) return;
    
    const start = new Date(editStartTime).getTime();
    const end = editEndTime ? new Date(editEndTime).getTime() : undefined;
    
    // Recalculate duration if applicable
    let durationSeconds = editingLog.durationSeconds;
    if (end) {
        durationSeconds = Math.floor((end - start) / 1000);
    } else if (editingLog.durationSeconds && !end) {
        if (editType === 'diaper') durationSeconds = undefined;
    }

    // Sanitize details based on type to avoid junk data
    const sanitizedDetails: LogEntry['details'] = { ...editDetails };
    if (editType !== 'feeding') {
        delete sanitizedDetails.feedingType;
        delete sanitizedDetails.side;
        delete sanitizedDetails.amountMl;
    }
    if (editType !== 'diaper') {
        delete sanitizedDetails.diaperState;
    }

    const updatedLog: LogEntry = {
        ...editingLog,
        type: editType,
        startTime: start,
        endTime: end,
        durationSeconds: durationSeconds,
        details: sanitizedDetails
    };
    
    // Write directly to Firestore
    await setDoc(doc(db, 'logs', updatedLog.id), updatedLog);
    
    setEditingLog(null);
    setIsCreating(false);
  };

  const handleAllDaySleep = () => {
      const now = new Date();
      const start = startOfDay(now);
      setEditStartTime(toLocalISO(start.getTime()));
      setEditEndTime(toLocalISO(now.getTime()));
  };

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (filterStart) {
        const startDate = startOfDay(new Date(filterStart));
        if (log.startTime < startDate.getTime()) return false;
      }
      if (filterEnd) {
        const endDate = endOfDay(new Date(filterEnd));
        if (log.startTime > endDate.getTime()) return false;
      }
      if (filterType !== 'all' && log.type !== filterType) {
        return false;
      }
      return true;
    });
  }, [logs, filterStart, filterEnd, filterType]);

  const groupedLogs = filteredLogs.reduce((acc, log) => {
    const dateKey = format(new Date(log.startTime), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(log);
    return acc;
  }, {} as Record<string, LogEntry[]>);

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a));

  const openExportModal = (dataToExport: LogEntry[]) => {
      setLogsToExport(dataToExport);
      setShowExportModal(true);
  };

  const performExport = () => {
      exportToCSV(logsToExport, exportColumns);
      setShowExportModal(false);
  }

  const toggleColumn = (key: string) => {
      setExportColumns(prev => prev.map(c => c.key === key ? { ...c, enabled: !c.enabled } : c));
  }

  return (
    <div className="p-6 pb-24 space-y-6">
      <header className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">History</h1>
        <div className="flex space-x-2">
            <button 
                onClick={handleCreateClick}
                className="text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 px-3 py-2 rounded-lg transition-colors shadow-sm"
            >
                + Log
            </button>
            {logs.length > 0 && (
                <button 
                    onClick={() => openExportModal(logs)}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                    Export All
                </button>
            )}
            {filteredLogs.length > 0 && (filterStart || filterEnd) && (
                <button 
                    onClick={() => openExportModal(filteredLogs)}
                    className="text-xs font-bold text-white bg-slate-800 dark:bg-slate-700 px-3 py-2 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shadow-sm"
                >
                    Export Filtered
                </button>
            )}
        </div>
      </header>
        
      {/* View Toggle */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button 
            onClick={() => setViewMode('list')}
            className={`flex-1 py-1.5 flex justify-center items-center rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
            <ListIcon className="w-5 h-5" />
            </button>
            <button 
            onClick={() => setViewMode('timeline')}
            className={`flex-1 py-1.5 flex justify-center items-center rounded-md transition-colors ${viewMode === 'timeline' ? 'bg-white dark:bg-slate-700 text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
            <CalendarIcon className="w-5 h-5" />
            </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
        {/* Date Filter */}
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Filter by Date</p>
                {(filterStart || filterEnd) && (
                    <button 
                    onClick={() => { setFilterStart(''); setFilterEnd(''); }}
                    className="text-xs text-pink-500 font-bold"
                    >
                    Clear
                    </button>
                )}
            </div>
            <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">From</label>
                <input 
                type="date" 
                value={filterStart}
                onChange={(e) => setFilterStart(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-xs"
                />
            </div>
            <div className="flex-1 space-y-1">
                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">To</label>
                <input 
                type="date" 
                value={filterEnd}
                onChange={(e) => setFilterEnd(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-xs"
                />
            </div>
            </div>
        </div>

        {/* Type Filter */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
             <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase mb-2">Activity Type</p>
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {(['all', 'feeding', 'sleep', 'diaper', 'pumping', 'solids'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
                            filterType === t 
                            ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        {t}
                    </button>
                ))}
             </div>
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="text-center py-12 text-slate-400 dark:text-slate-600">
          <p>No records found for this period.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 sticky top-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur py-2 z-10 border-b border-slate-50/0">
                {format(new Date(date), 'EEEE, MMMM do')}
              </h3>
              
              {viewMode === 'list' ? (
                  <div className="space-y-3">
                    {groupedLogs[date].map(log => (
                      <div 
                        key={log.id} 
                        onClick={() => handleEditClick(log)}
                        className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between group relative overflow-hidden cursor-pointer active:bg-slate-50 dark:active:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            log.type === 'feeding' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' :
                            log.type === 'sleep' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                            log.type === 'pumping' ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' :
                            log.type === 'solids' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                            'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          }`}>
                             {log.type === 'feeding' && <MilkIcon className="w-5 h-5" />}
                             {log.type === 'sleep' && <MoonIcon className="w-5 h-5" />}
                             {log.type === 'pumping' && <PumpIcon className="w-5 h-5" />}
                             {log.type === 'solids' && <FoodIcon className="w-5 h-5" />}
                             {log.type === 'diaper' && <BabyIcon className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize flex items-center gap-2 flex-wrap">
                              {log.type}
                              {log.durationSeconds && log.durationSeconds > 0 && (
                                <span className={`text-xs px-2 py-0.5 rounded font-bold ${log.type === 'sleep' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                    {formatDuration(log.durationSeconds)}
                                </span>
                              )}
                              {log.details.side && <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-normal">{log.details.side}</span>}
                              {log.details.amountMl && <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-normal">{log.details.amountMl}ml</span>}
                              {log.details.diaperState && <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-normal">{log.details.diaperState}</span>}
                              {log.details.foods && log.details.foods.map((food, i) => (
                                  <span key={i} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded font-normal">{food}</span>
                              ))}
                              {log.details.reaction && <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold border border-red-100 dark:border-red-900/50">Reaction: {log.details.reaction}</span>}
                              {log.details.foods && log.details.foods.map((food, i) => (
                                  <span key={i} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded font-normal">{food}</span>
                              ))}
                              {log.details.reaction && <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold border border-red-100 dark:border-red-900/50">Reaction: {log.details.reaction}</span>}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                              {format(new Date(log.startTime), 'h:mm a')} 
                              {log.endTime && ` - ${format(new Date(log.endTime), 'h:mm a')}`}
                            </div>
                            {log.details.notes && (
                              <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic truncate">
                                "{log.details.notes}"
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          onClick={(e) => handleDeleteClick(e, log.id)}
                          className={`ml-3 h-10 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
                            deletingId === String(log.id)
                              ? 'bg-red-500 text-white w-24 px-2' 
                              : 'w-10 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`}
                        >
                          {deletingId === String(log.id) ? (
                            <span className="text-xs font-bold animate-fade-in whitespace-nowrap">Confirm</span>
                          ) : (
                            <TrashIcon className="w-5 h-5 pointer-events-none" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
              ) : (
                  <Timeline 
                    logs={groupedLogs[date]} 
                    dayString={date} 
                    onEdit={handleEditClick} 
                  />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Export Options Modal */}
      {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowExportModal(false)}>
              <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100">Export Options</h3>
                  </div>
                  <div className="p-6 space-y-4">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Select columns to include in the CSV:</p>
                      <div className="space-y-2">
                          {exportColumns.map(col => (
                              <label key={col.key} className="flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={col.enabled}
                                    onChange={() => toggleColumn(col.key)}
                                    className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{col.label}</span>
                              </label>
                          ))}
                      </div>
                      <div className="flex space-x-3 pt-2">
                          <button 
                             onClick={() => setShowExportModal(false)}
                             className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl"
                          >
                              Cancel
                          </button>
                          <button 
                             onClick={performExport}
                             className="flex-1 py-3 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600"
                          >
                              Download
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Full Edit/Create Modal */}
      {editingLog && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setEditingLog(null)}>
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-slide-up sm:animate-fade-in max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 shrink-0">
              <h3 className="font-bold text-slate-700 dark:text-slate-200">{isCreating ? 'Log Activity' : 'Edit Record'}</h3>
              <button onClick={() => setEditingLog(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-medium">
                 Cancel
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto">
               <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {['feeding', 'sleep', 'diaper', 'pumping', 'solids'].map((t) => (
                      <button 
                        key={t}
                        onClick={() => {
                            setEditType(t as ActivityType);
                        }}
                        className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${editType === t ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-400 dark:text-slate-500'}`}
                      >{t}</button>
                  ))}
               </div>

               {/* Quick Action for All Day Sleep */}
               {isCreating && editType === 'sleep' && (
                   <button 
                     onClick={handleAllDaySleep}
                     className="w-full py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors text-sm"
                   >
                     Log "All Day Sleep" (Today)
                   </button>
               )}

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Start</label>
                     <input 
                       type="datetime-local" 
                       value={editStartTime}
                       onChange={e => setEditStartTime(e.target.value)}
                       className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">End</label>
                     <input 
                       type="datetime-local" 
                       value={editEndTime}
                       onChange={e => setEditEndTime(e.target.value)}
                       className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                     />
                  </div>
               </div>

               {/* Dynamic Details Fields */}
               {editType === 'feeding' && (
                   <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex justify-center space-x-3">
                           <button 
                              onClick={() => setEditDetails(p => ({ ...p, feedingType: 'nursing' }))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border ${editDetails.feedingType === 'nursing' ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                           >Nursing</button>
                           <button 
                              onClick={() => setEditDetails(p => ({ ...p, feedingType: 'bottle' }))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border ${editDetails.feedingType === 'bottle' ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                           >Bottle</button>
                        </div>

                        {editDetails.feedingType === 'nursing' && (
                           <div className="flex justify-center space-x-2">
                              {(['left', 'right', 'both'] as const).map(side => (
                                 <button
                                    key={side}
                                    onClick={() => setEditDetails(p => ({ ...p, side }))}
                                    className={`capitalize px-3 py-1.5 rounded-full text-sm border ${editDetails.side === side ? 'bg-pink-500 text-white border-pink-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}
                                 >
                                    {side}
                                 </button>
                              ))}
                           </div>
                        )}
                        
                        {editDetails.feedingType === 'bottle' && (
                           <div className="flex justify-center items-center space-x-2">
                              <input 
                                type="number" 
                                placeholder="Amount" 
                                value={editDetails.amountMl || ''}
                                className="w-24 p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                                onChange={e => setEditDetails(p => ({ ...p, amountMl: parseInt(e.target.value) || 0 }))}
                              />
                              <span className="text-slate-500 dark:text-slate-400 text-sm">ml</span>
                           </div>
                        )}
                   </div>
               )}

               {editType === 'pumping' && (
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex justify-center space-x-2">
                        {(['left', 'right', 'both'] as const).map(side => (
                            <button
                              key={side}
                              onClick={() => setEditDetails(p => ({ ...p, side }))}
                              className={`capitalize px-3 py-1.5 rounded-full text-sm border ${editDetails.side === side ? 'bg-cyan-500 text-white border-cyan-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}
                            >
                              {side}
                            </button>
                        ))}
                      </div>
                       <div className="flex justify-center items-center space-x-2">
                          <input 
                            type="number" 
                            placeholder="Amount" 
                            value={editDetails.amountMl || ''}
                            className="w-24 p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                            onChange={e => setEditDetails(p => ({ ...p, amountMl: parseInt(e.target.value) || 0 }))}
                          />
                          <span className="text-slate-500 dark:text-slate-400 text-sm">ml</span>
                       </div>
                  </div>
               )}

               {editType === 'solids' && (
                   <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Foods</label>
                             <div className="flex flex-wrap gap-2 mb-2">
                                {editDetails.foods && editDetails.foods.map((food, i) => (
                                    <span key={i} className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        {food}
                                        <button 
                                            onClick={() => setEditDetails(p => ({ ...p, foods: p.foods?.filter((_, idx) => idx !== i) }))}
                                            className="hover:text-orange-900 dark:hover:text-orange-100"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                             </div>
                             <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add food"
                                    className="flex-1 p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val) {
                                                setEditDetails(p => ({ ...p, foods: [...(p.foods || []), val] }));
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        const val = input.value.trim();
                                        if (val) {
                                            setEditDetails(p => ({ ...p, foods: [...(p.foods || []), val] }));
                                            input.value = '';
                                        }
                                    }}
                                    className="px-3 py-2 bg-orange-500 text-white rounded-lg font-bold text-sm"
                                >
                                    Add
                                </button>
                             </div>
                        </div>

                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Reaction?</label>
                           <input 
                             type="text"
                             placeholder="e.g. Rash"
                             value={editDetails.reaction || ''}
                             onChange={e => setEditDetails(p => ({ ...p, reaction: e.target.value }))}
                             className="w-full p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-sm"
                           />
                        </div>
                   </div>
               )}

               {editType === 'diaper' && (
                   <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                       <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Condition</p>
                       <div className="flex space-x-2">
                           {['wet', 'dirty', 'mixed'].map((s) => (
                               <button
                                 key={s}
                                 onClick={() => setEditDetails(p => ({ ...p, diaperState: s as any }))}
                                 className={`flex-1 py-2 rounded-lg text-sm capitalize border ${editDetails.diaperState === s ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                               >
                                   {s}
                               </button>
                           ))}
                       </div>
                   </div>
               )}

               <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">Notes</label>
                  <textarea
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none text-slate-700"
                    placeholder="Add details..."
                    value={editDetails.notes || ''}
                    onChange={(e) => setEditDetails(p => ({ ...p, notes: e.target.value }))}
                    rows={3}
                  />
               </div>

               <button 
                 onClick={saveEdit}
                 className="w-full py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
               >
                 {isCreating ? 'Create Log' : 'Save Changes'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;