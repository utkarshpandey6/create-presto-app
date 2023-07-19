module Home.Types where

import Prelude
import PrestoDOM (class Loggable)


data Action = OnBackPress

instance showAction :: Show Action where

    show (OnBackPress) = "Backpress"

data ScreenOutput = GoBack

type State = {
    content :: String
}

type ScreenInput = {
    content :: String
}

instance logAction :: Loggable Action
  where
    -- TODO :: fix logs
    performLog action =
      case action of
        _ -> pure $ pure unit