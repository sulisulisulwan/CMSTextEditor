import { useEffect } from 'react';
export const useBoldSelected = (toolbarStatus) => {
    useEffect(() => {
        console.log(toolbarStatus.bold.selected);
    }, [toolbarStatus.bold.selected]);
};
