import { View } from './view';

import { CategoryTab } from './CategoryTab';
import { categoryIcons } from '../icons';
import { Category } from '../types';

import template from '../templates/categoryTabs.ejs';
import classes from './CategoryTabs.scss';

type CategoryTabsOptions = {
  categories: Category[];
}

export class CategoryTabs extends View {
  private categories: Category[];
  private tabViews: CategoryTab[];
  private activeCategoryIndex = 0;

  constructor({ categories }: CategoryTabsOptions) {
    super({ template, classes });

    this.categories = categories;
  }

  initialize() {
    this.keyBindings = {
      ArrowLeft: this.stepSelectedTab(-1),
      ArrowRight: this.stepSelectedTab(1)
    };

    super.initialize();
  }

  async render(): Promise<HTMLElement> {
    this.tabViews = this.categories.map(category => 
      this.viewFactory.create(CategoryTab, { category, icon: categoryIcons[category.key] }));
    
    await super.render({
      tabs: this.tabViews.map(view => view.renderSync())
    });

    this.currentTabView.setActive(true);

    return this.el;
  }

  get currentCategory(): Category {
    return this.categories[this.activeCategoryIndex];
  }

  get currentTabView(): CategoryTab {
    return this.tabViews[this.activeCategoryIndex];
  }

  setActiveTab(index: number, focus = true): void {
    // Don't do anything if the desired tab is already active
    if (index === this.activeCategoryIndex) {
      return;
    }

    const oldCategory = this.currentTabView;
    const newCategory = this.tabViews[index];

    oldCategory.setActive(false, focus);
    newCategory.setActive(true, focus);
    this.activeCategoryIndex = index;
  }

  private getTargetCategory(index: number): number {
    if (index < 0) {
      return this.categories.length - 1;
    }

    if (index >= this.categories.length) {
      return 0;
    }

    return index;
  }
  
  private stepSelectedTab(step: number) {
    return () => {
      const newIndex = this.activeCategoryIndex + step;
      this.setActiveTab(this.getTargetCategory(newIndex));
    };
  }
}
