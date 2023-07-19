module Home.Flow where

import Prelude

import Types.Global as DG
import Home.Types (ScreenOutput(..))
import Presto.Core.Flow (Flow, doAff)
import PrestoDOM.Core (runScreen)
import Home.View as HomeView
import Effect.Class(liftEffect)
import Foreign.Object (empty)
import Effect (Effect)

liftFlow :: ∀ val a. (Effect val)  -> Flow a val
liftFlow effVal = doAff do liftEffect (effVal)

homeFlow :: forall a.Flow a DG.FlowResponse
homeFlow = do
    let input = {
            content : "You are at Home"
        }
    screenOutput <- doAff $ runScreen (HomeView.screen input) empty
    case screenOutput of
        GoBack -> pure $ DG.GoBack
