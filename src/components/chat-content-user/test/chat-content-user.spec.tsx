import { newSpecPage } from '@stencil/core/testing';
import { ChatContentUser } from '../chat-content-user';

describe('chat-content-user', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatContentUser],
      html: `<chat-content-user></chat-content-user>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-content-user>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-content-user>
    `);
  });
});
