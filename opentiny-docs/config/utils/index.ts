/**
 * Whether to generate package preview
 * 是否生成打包报告
 */
export default {};

export const isReportMode = (): boolean => process.env.REPORT === 'true';
