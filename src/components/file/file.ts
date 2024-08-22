import Block from '@/core/block';

type Props = { [key: string]: any };

class FileInput extends Block {
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
      <div class="file__wrapper">
        <label class="file__label" for="{{ name }}">{{ label }}</label>
          <input 
            class="file__control" 
            type="file" 
            name="{{ name }}" 
            id="{{ name }}" 
            />
      </div>
    `;
  };
};

export default FileInput;
