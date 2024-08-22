import Block from '@/core/block';

class Dropdown extends Block {
  init() {
    this.name = 'Dropdown';
  }

  render() {
    return `
      <div class="dropdown dropdown--{{position}}">
        <ul>
        {{#each list}}
          <li>
            <button 
              type="button"
              id={{id}}
              {{#if popover}}
              popovertarget="{{popover}}" 
              popovertargetaction="show"
              {{/if}}
              {{#if style}}class="{{style}}"{{/if}}
              >
              <span class="icon icon-{{icon}}"></span>
              {{ title }}
            </button>
          </li>
        {{/each}}
        </ul>
      </div>
    `;
  }
};

export default Dropdown;