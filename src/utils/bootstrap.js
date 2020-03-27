import {queryCache} from 'react-query'
import * as auth from './auth-client'
import * as listItemsClient from './list-items-client'

async function bootstrapAppData() {
  let appData = {user: null, listItems: []}

  if (auth.isLoggedIn()) {
    await window.__bookshelf_serverReady
    const [user, listItems] = await Promise.all([
      auth.getUser().then(d => d.user),
      listItemsClient.read().then(d => d.listItems),
    ])
    appData = {user, listItems}
  }
  queryCache.setQueryData('list-items', appData.listItems)
  return appData
}

export {bootstrapAppData}
