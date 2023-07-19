module Home.Controller where

import PrestoDOM (Eval, exit)
import Home.Types (Action(..), ScreenInput, ScreenOutput(..), State)

mkInitialState :: ScreenInput -> State
mkInitialState input = {
    content : input.content
}

eval :: Action -> State -> Eval Action ScreenOutput State
eval (OnBackPress) _ = exit GoBack