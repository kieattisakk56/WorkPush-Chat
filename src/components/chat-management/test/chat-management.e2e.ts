import { newE2EPage } from '@stencil/core/testing';

describe('chat-management', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-management></chat-management>');

    const element = await page.find('chat-management');
    expect(element).toHaveClass('hydrated');
  });
});
