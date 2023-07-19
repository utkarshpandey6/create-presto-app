module Utils.Utils where


import Prelude

import Effect (Effect)
import Effect.Class (liftEffect)
import Presto.Core.Flow (Flow, doAff)

foreign import href :: String -> Effect Unit

liftFlow :: ∀ val a. (Effect val)  -> Flow a val
liftFlow effVal = doAff do liftEffect (effVal)