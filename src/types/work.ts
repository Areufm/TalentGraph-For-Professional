export interface WorkInfo {
  title: string; // 职位名称
  salary: string; // 薪资
  education?: string | null; // 学历要求
  skill?: string[] | null; // 技能要求
  info?: string | null; // 福利信息
  kind1?: string | null; // 职位类型1
  kind2?: string | null; // 职位类型2
  kind3?: string | null; // 职位类型3
  description?: string | null; // 职位描述
  province?: string | null; // 省份
  city?: string | null; // 城市
  district?: string | null; // 区
  address?: string | null; // 地址
  major?: string[] | null; // 专业要求
  neo4j: number; // neo4j图谱信息
  company?: string | null; // 公司名称
  logo?: string | null; // 公司logo
  match_value?: number | null; // 匹配值
}
