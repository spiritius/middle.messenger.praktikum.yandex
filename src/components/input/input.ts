import Block from '@/core/block';

type Props = { [key: string]: any };

class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        // кастомное навешение события blur на внутренний элемент input
        'blur|input': props.onBlur || (() => {}),
        'input|input': props.onInput || (() => {})
      }
    });
  };

  render(): string {
    return `
      <div class="input__wrapper">
        <input 
          class="input__control {{ style }}" 
          type="{{ type }}" 
          name="{{ name }}" 
          id="{{ name }}" 
          value="{{ value }}"
          placeholder="{{ placeholder }}"
          {{#if required}}required{{/if}}
          {{#if autocomplete}}autocomplete="{{autocomplete}}"{{/if}}
          {{#if (eq disabled 'true') }}disabled{{/if}}>
        <label class="input__label" for="{{ name }}">{{ label }}</label>
        {{#if error}}
        <span class="input__error">{{ errorText }}</span>
        {{/if}}
      </div>
    `;
  };
};

export default Input;
