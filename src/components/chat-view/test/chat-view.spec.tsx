import { newSpecPage } from '@stencil/core/testing';
import { ChatView } from '../chat-view';

describe('chat-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatView],
      html: `<chat-view></chat-view>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-view>
    `);
  });
});
