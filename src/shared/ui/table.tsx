const Table = ({ children }: { children: React.ReactNode }) => (
  <div
    data-slot='table'
    className='divide-border-light relative flex size-full min-h-[calc(100vh-240px)] w-full flex-col space-y-6 divide-y overflow-auto'
  >
    {children}
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <div
    data-slot='table-header'
    className='grid grid-cols-[repeat(4,minmax(170px,1fr))] gap-x-6 opacity-70'
  >
    {children}
  </div>
);

const TableContent = ({ children }: { children: React.ReactNode }) => (
  <div data-slot='table-content' className='relative min-h-full flex-1'>
    {children}
  </div>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <div data-slot='table-cell' className='py-6'>
    {children}
  </div>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <div data-slot='table-row' className='grid grid-cols-[repeat(4,minmax(170px,1fr))] gap-x-6'>
    {children}
  </div>
);

export { Table, TableCell, TableContent, TableHeader, TableRow };
