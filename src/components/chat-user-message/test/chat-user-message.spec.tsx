import { newSpecPage } from '@stencil/core/testing';
import { ChatUserMessage } from '../chat-user-message';

describe('chat-user-message', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatUserMessage],
      html: `<chat-user-message></chat-user-message>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-user-message>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-user-message>
    `);
  });
});
