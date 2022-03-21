import { View } from './view';

import classes from './EmojiCategory.scss';
import { EmojiContainer } from './EmojiContainer';
import { Category, EmojiFocusTarget } from '../types';
import { LazyLoader } from '../LazyLoader';

type BaseEmojiCategoryOptions = {
  category: Category;
  showVariants: boolean;
  lazyLoader?: LazyLoader;
  template: string;
}

export abstract class BaseEmojiCategory extends View {
  protected category: Category;
  protected showVariants: boolean;
  protected lazyLoader?: LazyLoader;
  protected emojiContainer: EmojiContainer;

  protected baseUIElements = {
    categoryName: View.byClass(classes.categoryName)
  }

  setActive(active: boolean, focusTarget?: EmojiFocusTarget, performFocus?: boolean) {
    this.emojiContainer.setActive(active, focusTarget, performFocus);
  }

  constructor({ template, category, showVariants, lazyLoader }: BaseEmojiCategoryOptions) {
    super({ template, classes });

    this.category = category;
    this.showVariants = showVariants;
    this.lazyLoader = lazyLoader;
  }
}
