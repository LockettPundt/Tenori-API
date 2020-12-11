import { gql, IResolvers } from 'apollo-server'

export const settingsType = gql`

  type Setting {
    id: ID
    name: String
    createdAt: String
    value: String
  }
  
  type CreateNewSettingResponse {
    setting: Setting!
  }
  
  input SettingInput {
    name: String
    value: String!
  }
  
  type Query {
    getAllSettings: [Setting]
    getSetting: Setting
  }
  
  type Mutation {
    createNewSetting(setting: SettingInput): Setting!
  }
`

export interface Setting {
  id: string,
  name?: string,
  value: string,
  createdAt: string,
}

const mockSetting: Setting = {
  id: '1234',
  name: 'mock setting',
  value: '{json string}',
  createdAt: '12/12/2020',
}

export const settingsResolvers: IResolvers = {
  Query: {
    getAllSettings: async (obj, args, context) => {
      // console.log(context, args)
      return [mockSetting]
    },
    getSetting: async (obj, args, context) => {
      // console.log(context, args)
      return mockSetting
    }
  },
  Mutation: {
    createNewSetting: async (obj, { setting: { value, name } }, context) => {
      mockSetting.value = value
      return mockSetting
    }
  },
}