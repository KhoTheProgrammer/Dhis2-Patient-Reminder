import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import SendMessage from './components/SendMessage/SendMessage'
import NoPatientFound from "./assets/NoPatientFound/NoPatientFound"

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {
    const { error, loading, data } = useDataQuery(query)

    if (error) {
        return <span>{i18n.t('ERROR')}</span>
    }

    if (loading) {
        return <span>{i18n.t('Loading...')}</span>
    }

    return (
        <div >
            {/* <h1 className={classes.welcome}>{i18n.t('Hello {{name}}', { name: data.me.name })}</h1>
            <h3>{i18n.t('Welcome to DHIS2!')}</h3> */}
            <SendMessage></SendMessage>
        </div>
    )
}

export default MyApp
