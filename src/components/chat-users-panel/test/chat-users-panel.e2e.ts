import { newE2EPage } from '@stencil/core/testing';

describe('chat-users-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-users-panel></chat-users-panel>');

    const element = await page.find('chat-users-panel');
    expect(element).toHaveClass('hydrated');
  });
});
