import { newSpecPage } from '@stencil/core/testing';
import { ChatDirectory } from '../chat-directory';

describe('chat-directory', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatDirectory],
      html: `<chat-directory></chat-directory>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-directory>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-directory>
    `);
  });
});
