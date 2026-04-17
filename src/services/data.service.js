import { Profile } from '../models/Profile.js';
import { SkillGroup } from '../models/SkillGroup.js';
import { Experience } from '../models/Experience.js';
import { Project } from '../models/Project.js';
import { Education } from '../models/Education.js';

const DATA_BASE_PATH = './src/data';
const cache = new Map();

async function loadJson(fileName) {
  if (cache.has(fileName)) {
    return cache.get(fileName);
  }

  const response = await fetch(`${DATA_BASE_PATH}/${fileName}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}`);
  }

  const data = await response.json();
  cache.set(fileName, data);
  return data;
}

export async function getProfile() {
  const data = await loadJson('profile.json');
  return new Profile(data);
}

export async function getSkills() {
  const data = await loadJson('skills.json');
  return data.map((item) => new SkillGroup(item));
}

export async function getExperience() {
  const data = await loadJson('experience.json');
  return data.map((item) => new Experience(item));
}

export async function getProjects() {
  const data = await loadJson('projects.json');
  return data.map((item) => new Project(item));
}

export async function getEducation() {
  const data = await loadJson('education.json');
  return data.map((item) => new Education(item));
}
