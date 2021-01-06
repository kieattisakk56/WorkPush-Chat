import { newE2EPage } from '@stencil/core/testing';

describe('chat-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-view></chat-view>');

    const element = await page.find('chat-view');
    expect(element).toHaveClass('hydrated');
  });
});
