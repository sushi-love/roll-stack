export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'font-semibold',
      },
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3 font-semibold',
          },
        },
        variant: {
          gradient: 'text-neutral-950 bg-linear-to-br from-lime-300 to-lime-500 hover:opacity-90 disabled:bg-none disabled:bg-(--ui-bg-accented) disabled:text-neutral-400 aria-disabled:bg-(--ui-bg-accented) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)',
        },
        color: {
          secondary: '!text-white disabled:!bg-inverted/50',
        },
      },
    },
    tabs: {
      variants: {
        variant: {
          pill: {
            trigger: 'data-[state=active]:!text-white',
          },
          gradient: {
            list: 'bg-elevated rounded-lg',
            trigger: 'data-[state=active]:bg-linear-to-br from-lime-300 to-lime-500 data-[state=active]:text-neutral-950 flex-1 w-full',
            indicator: 'rounded-md shadow-xs',
          },
        },
      },
    },
    modal: {
      slots: {
        content: 'divide-y-0',
        header: 'pb-0 min-h-12',
        title: 'text-lg/5 font-semibold',
      },
    },
    navigationMenu: {
      slots: {
        link: 'text-sm',
      },
    },
    toast: {
      slots: {
        title: 'text-lg',
        description: 'leading-4',
        icon: 'shrink-0 size-7',
      },
    },
  },
})
