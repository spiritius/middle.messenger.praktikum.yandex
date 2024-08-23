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
        class="btn btn-{{ style }}"
        {{#if attributes}}{{{ attributes }}}{{/if}}
        {{#if id}}id="{{ id }}"{{/if}}
        >{{ title }}</button>
    `;
  };
};

export default Button;
