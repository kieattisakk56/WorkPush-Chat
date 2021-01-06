import { newSpecPage } from '@stencil/core/testing';
import { ChatUsersPanel } from '../chat-users-panel';

describe('chat-users-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatUsersPanel],
      html: `<chat-users-panel></chat-users-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-users-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-users-panel>
    `);
  });
});
