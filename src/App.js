import React from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import HeaderBar from './components/HeaderBar'; // Importing HeaderBar component
import MessageTable from './components/MessageTable'; // Importing MessageTable component
import './App.css'; // Importing global styles
import MessageTable from './components/MessageTable';

const query = {
    me: {
        resource: 'me',
    },
};

const App = () => {
    const { error, loading, data } = useDataQuery(query);

    if (error) {
        return <span>{i18n.t('ERROR')}</span>;
    }

    if (loading) {
        return <span>{i18n.t('Loading...')}</span>;
    }

    return (
        <div className="container">
            <HeaderBar />
            <h1 className="welcome">
                {i18n.t(' ', {  })}
            </h1>
            <h3>{i18n.t('')}</h3>
            <MessageTable/>
        </div>
    );
};

export default App;
