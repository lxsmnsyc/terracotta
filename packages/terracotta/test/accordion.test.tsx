import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, labelledBy, pressKeyOnFocused, referencedBy } from './aria';
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '../src/components/accordion';

const ITEMS = ['first', 'second', 'third'];

function renderAccordion(
  props: { value?: string; disabled?: string[] } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Accordion defaultValue={props.value} toggleable={true}>
      {ITEMS.map((item) => (
        <AccordionItem value={item} disabled={props.disabled?.includes(item)}>
          <AccordionHeader>
            <AccordionButton>{item} header</AccordionButton>
          </AccordionHeader>
          <AccordionPanel>{item} panel</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ));
}

function getButton(item: string): HTMLElement {
  return screen.getByRole('button', { name: `${item} header` });
}

describe('Accordion accessibility', () => {
  it('renders every header as a button', () => {
    renderAccordion();

    expect(screen.getAllByRole('button')).toHaveLength(ITEMS.length);
  });

  it('marks collapsed items with `aria-expanded="false"`', () => {
    renderAccordion();

    for (const item of ITEMS) {
      expect(getButton(item)).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands the item matching `defaultValue`', () => {
    renderAccordion({ value: 'second' });

    expect(getButton('second')).toHaveAttribute('aria-expanded', 'true');
    expect(getButton('first')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('second panel')).toBeInTheDocument();
    expect(screen.queryByText('first panel')).not.toBeInTheDocument();
  });

  it('omits `aria-controls` on collapsed items instead of pointing at a missing id', () => {
    renderAccordion({ value: 'second' });

    expect(getButton('first')).not.toHaveAttribute('aria-controls');
    expect(getButton('second')).toHaveAttribute('aria-controls');
  });

  it('links the expanded button to its panel in both directions', () => {
    renderAccordion({ value: 'second' });
    const button = getButton('second');
    const panel = screen.getByText('second panel');

    expect(button).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', button.id);
  });

  it('expands an item on click', () => {
    renderAccordion();

    getButton('third').click();

    expect(getButton('third')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('third panel')).toBeInTheDocument();
  });

  it('collapses a toggleable item on a second click', () => {
    renderAccordion({ value: 'first' });

    getButton('first').click();

    expect(getButton('first')).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps only one item expanded in single mode', () => {
    renderAccordion({ value: 'first' });

    getButton('second').click();

    expect(getButton('first')).toHaveAttribute('aria-expanded', 'false');
    expect(getButton('second')).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks disabled items as disabled and ignores their clicks', () => {
    renderAccordion({ disabled: ['second'] });
    const button = getButton('second');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabindex', '-1');

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('moves focus with ArrowDown and ArrowUp', async () => {
    renderAccordion();
    getButton('first').focus();

    pressKeyOnFocused('ArrowDown');
    expect(await activeElement()).toBe(getButton('second'));

    pressKeyOnFocused('ArrowUp');
    expect(await activeElement()).toBe(getButton('first'));
  });

  it('jumps to the first and last header with Home and End', async () => {
    renderAccordion();
    getButton('second').focus();

    pressKeyOnFocused('End');
    expect(await activeElement()).toBe(getButton('third'));

    pressKeyOnFocused('Home');
    expect(await activeElement()).toBe(getButton('first'));
  });

  it('skips disabled headers during keyboard navigation', async () => {
    renderAccordion({ disabled: ['second'] });
    getButton('first').focus();

    pressKeyOnFocused('ArrowDown');

    expect(await activeElement()).toBe(getButton('third'));
  });

  it('supports multiple expanded items in multiple mode', () => {
    render(() => (
      <Accordion multiple={true} defaultValue={['first', 'second']}>
        {ITEMS.map((item) => (
          <AccordionItem value={item}>
            <AccordionHeader>
              <AccordionButton>{item} header</AccordionButton>
            </AccordionHeader>
            <AccordionPanel>{item} panel</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    ));

    expect(getButton('first')).toHaveAttribute('aria-expanded', 'true');
    expect(getButton('second')).toHaveAttribute('aria-expanded', 'true');
    expect(getButton('third')).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks every panel as a region named by its button', () => {
    renderAccordion({ value: 'second' });
    const region = screen.getByRole('region');

    expect(region).toHaveTextContent('second panel');
    expect(labelledBy(region)).toBe(getButton('second'));
  });

  it('leaves arrow keys alone inside a panel', async () => {
    render(() => (
      <Accordion defaultValue="first">
        <AccordionItem value="first">
          <AccordionHeader>
            <AccordionButton>first header</AccordionButton>
          </AccordionHeader>
          <AccordionPanel>
            <input aria-label="name" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="second">
          <AccordionHeader>
            <AccordionButton>second header</AccordionButton>
          </AccordionHeader>
          <AccordionPanel>second panel</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ));
    const input = screen.getByRole('textbox', { name: 'name' });
    input.focus();

    for (const key of ['ArrowDown', 'ArrowUp', 'Home', 'End']) {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      input.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    }
    expect(await activeElement()).toBe(input);
  });

  it('reports an expanded section that cannot collapse as disabled', () => {
    render(() => (
      <Accordion defaultValue="first">
        {ITEMS.map((item) => (
          <AccordionItem value={item}>
            <AccordionHeader>
              <AccordionButton>{item} header</AccordionButton>
            </AccordionHeader>
            <AccordionPanel>{item} panel</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    ));

    expect(getButton('first')).toHaveAttribute('aria-disabled', 'true');
    expect(getButton('first')).not.toHaveAttribute('disabled');
    expect(getButton('second')).toHaveAttribute('aria-disabled', 'false');

    getButton('second').click();

    expect(getButton('first')).toHaveAttribute('aria-disabled', 'false');
    expect(getButton('second')).toHaveAttribute('aria-disabled', 'true');
  });

  it('keeps an expanded toggleable section enabled', () => {
    renderAccordion({ value: 'first' });

    expect(getButton('first')).toHaveAttribute('aria-disabled', 'false');
  });

  it('keeps `aria-controls` while collapsed when the panel stays mounted', () => {
    render(() => (
      <Accordion defaultValue={undefined} toggleable={true}>
        <AccordionItem value="first">
          <AccordionHeader>
            <AccordionButton>first header</AccordionButton>
          </AccordionHeader>
          <AccordionPanel unmount={false}>first panel</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ));
    const button = getButton('first');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(referencedBy(button, 'aria-controls')).toHaveTextContent('first panel');
  });

  it('drops `aria-controls` when the panel unmounts', () => {
    renderAccordion({ value: 'first' });

    getButton('first').click();

    expect(getButton('first')).not.toHaveAttribute('aria-controls');
  });

  it('marks disabled containers with the data attribute only', () => {
    const result = render(() => (
      <Accordion defaultValue={undefined} disabled={true}>
        <AccordionItem value="first" disabled={true}>
          <AccordionHeader>
            <AccordionButton>first header</AccordionButton>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    ));
    const root = result.container.querySelector('[tc-accordion]');
    const item = result.container.querySelector('[tc-accordion-item]');

    for (const element of [root, item]) {
      expect(element).toHaveAttribute('tc-disabled');
      expect(element).not.toHaveAttribute('aria-disabled');
      expect(element).not.toHaveAttribute('disabled');
    }
  });
});
