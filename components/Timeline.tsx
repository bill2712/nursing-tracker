import React from 'react';
import { format, differenceInMinutes, startOfDay } from 'date-fns';
import { LogEntry } from '../types';
import { formatDuration } from '../utils';
import { MilkIcon, MoonIcon, BabyIcon, PumpIcon, FoodIcon } from './Icons';

interface TimelineProps {
  logs: LogEntry[];
  dayString: string; // "yyyy-MM-dd"
  onEdit: (log: LogEntry) => void;
}

const Timeline: React.FC<TimelineProps> = ({ logs, dayString, onEdit }) => {
  const hours = Array.from({ length: 25 }, (_, i) => i); // 0 to 24

  const getPosition = (log: LogEntry) => {
    const start = new Date(log.startTime);
    // Force local midnight for the visual timeline anchor
    const dayStart = new Date(dayString + 'T00:00:00');
    
    // Calculate minutes from start of day
    let startMinutes = differenceInMinutes(start, dayStart);
    
    // Handle logs that might be slightly before midnight due to precision or timezone edge cases
    if (startMinutes < 0) startMinutes = 0;
    
    let duration = log.durationSeconds ? log.durationSeconds / 60 : 15; // default 15m for point events
    if (log.type === 'diaper' || log.type === 'solids') duration = 10; // smaller for instant events

    const top = (startMinutes / 1440) * 100;
    const height = (duration / 1440) * 100;

    return { top: `${top}%`, height: `${Math.max(height, 1.5)}%` }; // Min height 1.5% (~20 mins visual)
  };

  // We rely on the parent to pass the correct logs for the day.
  // Filtering again here can cause timezone issues if new Date(date) shifts the day.
  const dayLogs = logs;

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden h-[960px] flex">
       {/* Time Axis */}
       <div className="w-12 flex-shrink-0 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-[10px] text-slate-400 font-medium relative select-none">
          {hours.map(h => (
              <div key={h} className="absolute w-full text-center" style={{ top: `${(h / 24) * 100}%`, transform: 'translateY(-50%)' }}>
                  {h}:00
              </div>
          ))}
       </div>

       {/* Grid Lines */}
       <div className="absolute inset-0 left-12 pointer-events-none">
           {hours.map(h => (
               <div key={h} className="absolute w-full border-t border-slate-100 dark:border-slate-800/50" style={{ top: `${(h / 24) * 100}%` }} />
           ))}
       </div>
       
       {/* Events */}
       <div className="flex-1 relative ml-1">
           {dayLogs.map(log => {
               const pos = getPosition(log);
               let bgColor = 'bg-slate-200';
               let textColor = 'text-slate-600';
               
               if (log.type === 'feeding') { bgColor = 'bg-pink-200 dark:bg-pink-900/60'; textColor = 'text-pink-800 dark:text-pink-200'; }
               else if (log.type === 'sleep') { bgColor = 'bg-indigo-200 dark:bg-indigo-900/60'; textColor = 'text-indigo-800 dark:text-indigo-200'; }
               else if (log.type === 'diaper') { bgColor = 'bg-emerald-200 dark:bg-emerald-900/60'; textColor = 'text-emerald-800 dark:text-emerald-200'; }
               else if (log.type === 'pumping') { bgColor = 'bg-cyan-200 dark:bg-cyan-900/60'; textColor = 'text-cyan-800 dark:text-cyan-200'; }
               else if (log.type === 'solids') { bgColor = 'bg-orange-200 dark:bg-orange-900/60'; textColor = 'text-orange-800 dark:text-orange-200'; }

               return (
                   <div 
                       key={log.id}
                       onClick={() => onEdit(log)}
                       className={`absolute left-1 right-1 rounded-md ${bgColor} ${textColor} border border-white/20 shadow-sm cursor-pointer hover:brightness-95 transition-all z-10 overflow-hidden px-2 py-1 flex items-start gap-2`}
                       style={{ top: pos.top, height: pos.height }}
                   >
                        <div className="mt-0.5 opacity-70">
                            {log.type === 'feeding' && <MilkIcon className="w-3 h-3" />}
                            {log.type === 'sleep' && <MoonIcon className="w-3 h-3" />}
                            {log.type === 'diaper' && <BabyIcon className="w-3 h-3" />}
                            {log.type === 'pumping' && <PumpIcon className="w-3 h-3" />}
                            {log.type === 'solids' && <FoodIcon className="w-3 h-3" />}
                        </div>
                        <div className="text-[10px] font-bold leading-tight truncate">
                            {format(new Date(log.startTime), 'HH:mm')}
                            {log.endTime && ` - ${format(new Date(log.endTime), 'HH:mm')}`}
                            <span className="font-normal opacity-80 block truncate">
                                {log.type === 'feeding' && (
                                  (log.details.side === 'left' ? '左' : (log.details.side === 'right' ? '右' : (log.details.side === 'both' ? '雙邊' : log.details.side))) || 
                                  (log.details.feedingType === 'nursing' ? '親餵' : (log.details.feedingType === 'bottle' ? '瓶餵' : log.details.feedingType))
                                )}
                                {log.type === 'sleep' && formatDuration(log.durationSeconds || 0)}
                                {log.details.notes}
                            </span>
                        </div>
                   </div>
               );
           })}
       </div>
    </div>
  );
};

export default Timeline;
