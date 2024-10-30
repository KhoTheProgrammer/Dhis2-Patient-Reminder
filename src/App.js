import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import classes from './App.module.css'

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {
    
    return (
        <div className={classes.container}>
           kondwani padyera
        </div>
    )
}

export default MyApp
