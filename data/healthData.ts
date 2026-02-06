import { Vaccine, Milestone } from '../types';

export const INITIAL_VACCINES: Omit<Vaccine, 'completed' | 'date' | 'notes'>[] = [
  { id: 'v1', name: '乙型肝炎疫苗 (第一劑)', ageMonths: 0 },
  { id: 'v2', name: '卡介苗', ageMonths: 0 },
  { id: 'v3', name: '乙型肝炎疫苗 (第二劑)', ageMonths: 1 },
  { id: 'v4', name: '五合一疫苗 (第一劑): 白喉、破傷風、百日咳、小兒麻痺、乙型流感嗜血桿菌', ageMonths: 2 },
  { id: 'v5', name: '肺炎球菌疫苗 (第一劑)', ageMonths: 2 },
  { id: 'v6', name: '五合一疫苗 (第二劑)', ageMonths: 4 },
  { id: 'v7', name: '肺炎球菌疫苗 (第二劑)', ageMonths: 4 },
  { id: 'v8', name: '乙型肝炎疫苗 (第三劑)', ageMonths: 6 },
  { id: 'v9', name: '五合一疫苗 (第三劑)', ageMonths: 6 },
  { id: 'v10', name: '麻疹、流行性腮腺炎、德國麻疹及水痘混合疫苗 (第一劑)', ageMonths: 12 },
  { id: 'v11', name: '肺炎球菌疫苗 (加強劑)', ageMonths: 12 },
  { id: 'v12', name: '五合一疫苗 (加強劑)', ageMonths: 18 },
  { id: 'v13', name: '麻疹、流行性腮腺炎、德國麻疹及水痘混合疫苗 (第二劑)', ageMonths: 18 },
];

export const INITIAL_MILESTONES: Omit<Milestone, 'completed' | 'date'>[] = [
  // 1 Month
  { id: 'm1', ageMonths: 1, category: 'motor', description: '俯臥時能短暫抬頭' },
  { id: 'm2', ageMonths: 1, category: 'social', description: '注視人臉' },
  // 2 Months
  { id: 'm3', ageMonths: 2, category: 'motor', description: '俯臥時頭能抬離床面 45 度' },
  { id: 'm4', ageMonths: 2, category: 'social', description: '會發出類似「艾」、「哦」的聲音' },
  { id: 'm5', ageMonths: 2, category: 'social', description: '逗引時會微笑' },
  // 4 Months
  { id: 'm6', ageMonths: 4, category: 'motor', description: '俯臥時頭抬至 90 度' },
  { id: 'm7', ageMonths: 4, category: 'motor', description: '會翻身 (由俯臥翻成仰臥)' },
  { id: 'm8', ageMonths: 4, category: 'cognitive', description: '伸手抓握物品' },
  // 6 Months
  { id: 'm9', ageMonths: 6, category: 'motor', description: '靠著坐穩' },
  { id: 'm10', ageMonths: 6, category: 'cognitive', description: '雙手交換物品' },
  { id: 'm11', ageMonths: 6, category: 'language', description: '發出單音 (如 ma, da)' },
  // 9 Months
  { id: 'm12', ageMonths: 9, category: 'motor', description: '扶著東西站立' },
  { id: 'm13', ageMonths: 9, category: 'motor', description: '會爬行 (腹部貼地或四肢著地)' },
  { id: 'm14', ageMonths: 9, category: 'cognitive', description: '拇指與食指捏取小物 (鉗式抓握)' },
  // 12 Months
  { id: 'm15', ageMonths: 12, category: 'motor', description: '獨自站立片刻' },
  { id: 'm16', ageMonths: 12, category: 'motor', description: '扶著家具行走' },
  { id: 'm17', ageMonths: 12, category: 'language', description: '有意義地叫「爸爸」、「媽媽」' },
];
