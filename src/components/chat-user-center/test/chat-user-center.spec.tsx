import { newSpecPage } from '@stencil/core/testing';
import { ChatUserCenter } from '../chat-user-center';

describe('chat-user-center', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatUserCenter],
      html: `<chat-user-center></chat-user-center>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-user-center>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-user-center>
    `);
  });
});
