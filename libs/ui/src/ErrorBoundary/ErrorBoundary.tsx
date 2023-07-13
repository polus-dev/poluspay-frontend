import { Component } from 'react';
import { notify } from '@poluspay-frontend/ui';

export class ErrorBoundary extends Component {
    // constructor(props: any) {
    //     super(props);
    // }
    componentDidCatch(error: Error, errorInfo: any) {
        console.error('error', error);
        console.error('errorInfo', errorInfo);
        notify({
            title: 'Error',
            description: 'check console error',
            status: 'error',
        });
    }

    // render() {
    //     return this.props.children;
    // }
}
