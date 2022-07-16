import { parse } from 'twemoji-parser';

import { EmojiRecord, EmojiSelection, Renderer, toElement } from 'picmo';

import classes from './twemoji.scss';

type TwemojiImageFormat = 'svg' | 'png';

import * as spriteSheets from './sprites';

/**
 * Given an EmojiRecord, calculate the key of its sprite within the sprite sheet.
 * 
 * @param record the record to render
 * @returns the key of the sprite
 */
function getTwemojiKey(record: EmojiRecord) {
  const [result] = parse(record.emoji);
  const [filename] = result.url.split('/').slice(-1);
  const [key] = filename.split('.');
  return key;
}

function getTwemojiUrl(record: EmojiRecord, format: TwemojiImageFormat) {
  const [result] = parse(record.emoji, { assetType: format });
  return result?.url;
}

const SVG_SPRITES_ID = 'picmo-twemoji-sprites';

function renderSvg(svgKey) {
  return toElement(/* html */`
    <svg class="${classes.twemoji}">
      <use xlink:href="#${svgKey}" />
    </svg>
  `);
}

/**
 * Renders emojis using Twemoji images.
 */
export class TwemojiRenderer extends Renderer {
  private format: TwemojiImageFormat;

  constructor(format: TwemojiImageFormat = 'svg') {
    super();
    this.format = format;
    this.#insertSvg();
  }

  /**
   * Inserts the SVG sprite sheets into the document if they do not already exist.
   */
  #insertSvg() {
    if (!document.getElementById(SVG_SPRITES_ID)) {
      const svgContainer = document.createElement('div');
      svgContainer.id = SVG_SPRITES_ID;

      Object.values(spriteSheets).forEach(spriteContent => {
        svgContainer.appendChild(toElement(spriteContent));
      });

      document.body.appendChild(svgContainer);
    }
  }

  render(record: EmojiRecord, classNames = classes.twemoji) {
    const svgKey = getTwemojiKey(record);
    if (svgKey) {
      return this.renderElement(renderSvg(svgKey));
    }

    return this.renderImage(classNames, () => {
      return getTwemojiUrl(record, this.format);
    });
  }

  emit(record: EmojiRecord): EmojiSelection {
    return { 
      url: getTwemojiUrl(record, this.format), 
      hexcode: record.hexcode,
      emoji: record.emoji, 
      label: record.label 
    };
  }
}
