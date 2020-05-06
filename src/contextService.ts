import BotPlugin from './index';
import addStandardContextMethods from './standardContextMethods';

export default class ContextService {
  botPlugin: BotPlugin;
  fields = {};

  constructor(botPlugin) {
    this.botPlugin = botPlugin;
    addStandardContextMethods(this, botPlugin);
  }

  set(slug, value) {
    this.fields[slug] = value;
  }

  apply(ctx) {
    Object.assign(ctx, this.fields);
  }
}