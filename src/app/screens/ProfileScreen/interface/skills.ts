export interface ISkillsData {
  primarySkill: string | null;
  secondarySkill: string | null;
  ternarySkill: string | null;
  otherSkills: string | null;
}

export interface IUpdateSkillFormData {
  primaryTechnicalSkill?: string;
  secondaryTechnicalSkill?: string;
  ternaryTechnicalSkill?: string;
  otherSkills?: string;
}

