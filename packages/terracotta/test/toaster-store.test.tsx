import { render, screen } from '@solidjs/testing-library';
import { For, flush } from 'solid-js';
import { withRoot } from './reactive';
import { describe, expect, it, vi } from 'vitest';
import { Toast, Toaster, ToasterStore, useToaster } from '../src/components/toast';

interface Notice {
  title: string;
}

describe('ToasterStore', () => {
  it('starts empty', () => {
    const store = new ToasterStore<Notice>();

    expect(store.getQueue()).toEqual([]);
  });

  it('appends created toasts in order and returns their ids', () => {
    const store = new ToasterStore<Notice>();

    const first = store.create({ title: 'Saved' });
    const second = store.create({ title: 'Copied' });

    expect(store.getQueue()).toEqual([
      { id: first, data: { title: 'Saved' } },
      { id: second, data: { title: 'Copied' } },
    ]);
  });

  it('gives every toast a distinct id', () => {
    const store = new ToasterStore<Notice>();

    const ids = [
      store.create({ title: 'a' }),
      store.create({ title: 'b' }),
      store.create({ title: 'c' }),
    ];

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps ids distinct across separate stores', () => {
    const first = new ToasterStore<Notice>();
    const second = new ToasterStore<Notice>();

    expect(first.create({ title: 'a' })).not.toBe(second.create({ title: 'a' }));
  });

  it('produces ids usable as DOM ids, with no stray characters', () => {
    const store = new ToasterStore<Notice>();

    // Ids end up on elements, so they must survive `getElementById`.
    expect(store.create({ title: 'a' })).toMatch(/^toast-\d+-\d+$/);
  });

  it('removes only the toast with the given id', () => {
    const store = new ToasterStore<Notice>();
    const first = store.create({ title: 'Saved' });
    store.create({ title: 'Copied' });

    store.remove(first);

    expect(store.getQueue()).toHaveLength(1);
    expect(store.getQueue()[0].data.title).toBe('Copied');
  });

  it('ignores a remove for an unknown id', () => {
    const store = new ToasterStore<Notice>();
    store.create({ title: 'Saved' });

    store.remove('not-a-real-id');

    expect(store.getQueue()).toHaveLength(1);
  });

  it('empties the queue on clear', () => {
    const store = new ToasterStore<Notice>();
    store.create({ title: 'Saved' });
    store.create({ title: 'Copied' });

    store.clear();

    expect(store.getQueue()).toEqual([]);
  });

  it('notifies subscribers on create, remove and clear', () => {
    const store = new ToasterStore<Notice>();
    const listener = vi.fn();
    store.subscribe((queue) => {
      listener(queue);
    });

    const id = store.create({ title: 'Saved' });
    store.remove(id);
    store.clear();

    expect(listener).toHaveBeenCalledTimes(3);
  });

  it('hands subscribers a copy, so the queue cannot be mutated from outside', () => {
    const store = new ToasterStore<Notice>();
    let received: unknown[] = [];
    store.subscribe((queue) => {
      received = queue;
    });

    store.create({ title: 'Saved' });
    received.push({ id: 'injected', data: { title: 'Injected' } });

    expect(store.getQueue()).toHaveLength(1);
  });

  it('stops notifying once unsubscribed', () => {
    const store = new ToasterStore<Notice>();
    const listener = vi.fn();

    const unsubscribe = store.subscribe((queue) => {
      listener(queue);
    });
    unsubscribe();
    store.create({ title: 'Saved' });

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('useToaster', () => {
  it('starts from whatever the store already holds', () => {
    const store = new ToasterStore<Notice>();
    store.create({ title: 'Queued before mount' });

    const [queue, dispose] = withRoot(() => useToaster(store));

    expect(queue()).toHaveLength(1);
    dispose();
  });

  it('re-renders the region as toasts are created and removed', () => {
    const store = new ToasterStore<Notice>();

    render(() => {
      const queue = useToaster(store);
      return (
        <Toaster>
          <For each={queue()}>{(item) => <Toast>{item.data.title}</Toast>}</For>
        </Toaster>
      );
    });

    expect(screen.queryAllByRole('status')).toHaveLength(0);

    const id = store.create({ title: 'Saved' });
    // The store notifies a signal, and Solid 2 defers the render that follows.
    flush();

    expect(screen.getByRole('status')).toHaveTextContent('Saved');

    store.remove(id);
    flush();

    expect(screen.queryAllByRole('status')).toHaveLength(0);
  });

  it('stops listening once the owning root is disposed', () => {
    const store = new ToasterStore<Notice>();

    const { unmount } = render(() => {
      const queue = useToaster(store);
      return (
        <Toaster>
          <For each={queue()}>{(item) => <Toast>{item.data.title}</Toast>}</For>
        </Toaster>
      );
    });

    unmount();

    // Would throw if the disposed effect were still writing to a dead signal.
    expect(() => store.create({ title: 'After unmount' })).not.toThrow();
  });
});
