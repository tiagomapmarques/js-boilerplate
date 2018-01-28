import { project } from './project';

export const page = {
  title: 'Js Boilerplate',
  description: project.description,
  keywords: project.keywords.join(','),
  author: project.author,
  copyright: 'https://raw.githubusercontent.com/tiagomapmarques/js-boilerplate/develop/LICENSE',
  rootId: 'app',
  template: '.index.ejs',
  cache: false,
};
