class TokenState {
  Token: any[] = [];

  constructor() {
    this.Token = [];
  }
}

const TokenActionType = {
  FetchToken: 'FetchToken',
  AddToken: 'AddToken',
  UpdateToken: 'UpdateToken',
  DeleteToken: 'DeleteToken',
  resetTokenState: 'resetTokenState',
};

interface Action {
  type: string;
  payload: any;
}

function fetchTokenAction(Token: any): Action {
//   console.log(Token);
  

  return { type: TokenActionType.FetchToken, payload: Token.info };
}

function resetTokenAction(Token: any): Action {
  return { type: TokenActionType.resetTokenState, payload: Token.info };
}

function addTokenAction(Token: any): Action {
  return { type: TokenActionType.AddToken, payload: Token };
}

function updateTokenAction(Token: any): Action {
  return { type: TokenActionType.UpdateToken, payload: Token };
}

function deleteTokenAction(id: string): Action {
  return { type: TokenActionType.DeleteToken, payload: id };
}

function TokenReducer(
  currentState: TokenState = new TokenState(),
  action: Action
): TokenState {
  const newState = { ...currentState };

  switch (action.type) {
    case TokenActionType.FetchToken:
    case TokenActionType.resetTokenState:
      newState.Token = action.payload;
      break;

    case TokenActionType.AddToken:
      newState.Token.push(action.payload);
      break;

    case TokenActionType.UpdateToken:
      const indexToUpdate = newState.Token.findIndex(
        (p) => p._id === action.payload._id
      );
      if (indexToUpdate >= 0) {
        newState.Token[indexToUpdate] = action.payload;
      }
      break;

    case TokenActionType.DeleteToken:
      const indexToDelete = newState.Token.findIndex(
        (p) => p._id === action.payload
      );
      if (indexToDelete >= 0) {
        newState.Token.splice(indexToDelete, 1);
      }
      break;
  }

  return newState;
}

export {
  TokenState,
  TokenActionType,
  fetchTokenAction,
  resetTokenAction,
  addTokenAction,
  updateTokenAction,
  deleteTokenAction,
  TokenReducer,
};
