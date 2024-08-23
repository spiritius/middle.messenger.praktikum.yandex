import Block from '@/core/block';

type Props = { [key: string]: any };

class ProfileBack extends Block {
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
      <button type="button" class="profile__back">
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" />
          <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/>
          <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
        </svg>
      </button>
    `;
  };
};

export default ProfileBack;
