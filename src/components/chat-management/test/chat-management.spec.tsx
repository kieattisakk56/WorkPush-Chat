import { newSpecPage } from '@stencil/core/testing';
import { ChatManagement } from '../chat-management';

describe('chat-management', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatManagement],
      html: `<chat-management></chat-management>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-management>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-management>
    `);
  });
});
