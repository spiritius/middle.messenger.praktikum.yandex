import Block from '@/core/block';

type Props = { [key: string]: any };

class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  };

  render(): string {
    return `
      <button 
        type="{{ type }}" 
        class="btn {{#if style}}btn-{{ style }}{{/if}} {{ class }}"
        {{#if attributes}}{{{ attributes }}}{{/if}}
        {{#if id}}id="{{ id }}"{{/if}}
        {{#if (eq disabled 'true') }}disabled{{/if}}
        >
        {{#if icon}}<span class="icon icon-{{ icon }}"></span>{{/if}}
        {{ title }}
        </button>
    `;
  };
};

export default Button;
