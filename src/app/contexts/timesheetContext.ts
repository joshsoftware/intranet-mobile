import {createContext} from 'react';

const TimesheetContext = createContext<{
  onDelete: (timesheet_id: string) => void;
  onEdit: (timesheet_id: string) => void;
}>({
  onDelete: function (_: string): void {
    throw new Error('Function not implemented.');
  },
  onEdit: function (_: string): void {
    throw new Error('Function not implemented.');
  },
});

export default TimesheetContext;
