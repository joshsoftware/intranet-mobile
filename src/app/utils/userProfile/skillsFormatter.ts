const skillsFormatter = (skills: string): string[] =>
  skills ? skills.split(',') : [];
export default skillsFormatter;
