import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from 'solid-headless';
import { For, JSX } from 'solid-js';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const ACCORDION_ITEM = classNames(
  'rounded-lg flex items-center justify-between text-left w-full px-4 py-2 text-sm font-medium transition duration-150',
  'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
  'focus-visible:ring-gray-900',
  'dark:focus-visible:ring-gray-50',
  'border-2 border-gray-900 dark:border-gray-50',
  // Background
  'bg-gray-900 hover:bg-gray-700 active:bg-gray-800',
  // Foreground
  'text-gray-50 hover:text-gray-200 active:text-gray-100',
);

function ChevronUpIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
}

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'Magic Conch Shell, will I ever get married?',
    answer: 'Maybe someday.',
  },
  {
    question: 'Oh, Magic Conch Shell, what do we need to do to get out of the Kelp Forest?',
    answer: 'Nothing.',
  },
  {
    question: 'Uh, hello there. Magic Conch, uh, I was wondering... uh, should I have the spaghetti or the turkey?',
    answer: 'Neither.',
  },
  {
    question: 'Oh, then how about the soup?',
    answer: 'I don\'t think so.',
  },
  {
    question: 'Could I have anything to eat?',
    answer: 'No.',
  },
];

export default function App(): JSX.Element {
  return (
    <div class="w-full m-4 md:w-1/2">
      <Accordion<FAQ | undefined> toggleable>
        <For each={FAQS}>
          {(faq) => (
            <AccordionItem value={faq} class="mt-2">
              <AccordionHeader>
                <AccordionButton
                  as="div"
                  class={ACCORDION_ITEM}
                >
                  {({ isSelected }) => (
                    <>
                      <span>{faq.question}</span>
                      <div>
                        <ChevronUpIcon
                          class={`flex-0 ${isSelected() ? 'transform rotate-180' : ''} w-5 h-5 text-gray-50`}
                        />
                      </div>
                    </>
                  )}
                </AccordionButton>
              </AccordionHeader>
              <AccordionPanel class="px-4 pt-4 pb-2 text-sm text-gray-900 dark:text-gray-50">
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          )}
        </For>
      </Accordion>
    </div>
  );
}
