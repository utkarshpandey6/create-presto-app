module Main where

import Prelude

import Effect (Effect)
import PrestoDOM.Core as PrestoDom
import Presto.Core.Language.Runtime.Interpreter (PermissionRunner(..), Runtime(..), run)
import Presto.Core.Types.Language.Flow (defaultState)
import PrestoDOM.Core.Types.Language.Flow (initUI)
import Presto.Core.Types.Permission (PermissionStatus(..))
import Effect.Aff (launchAff_, makeAff, nonCanceler)
import Effect.Aff.AVar (new)
import Presto.Core.Flow (Flow)
import Home.Flow as Home
import Control.Monad.State(evalStateT)
import Presto.Core.Language.Runtime.API (APIRunner)

foreign import startBackPress :: (String -> Effect Boolean) -> Effect Unit

apiRunner :: APIRunner
apiRunner _ =
  makeAff
    ( \_ -> pure $ nonCanceler
    )

onBackPress :: String -> Effect Boolean
onBackPress _ = do
  PrestoDom.processEvent "onBackPressedEvent" {}
  pure true

main :: Effect Unit
main = do
  startBackPress onBackPress
  let runtime = Runtime (const $ pure "")
                        (PermissionRunner (const $ pure PermissionGranted ) (const $ pure []))
                        apiRunner
      launchFlow = run runtime appFlow
  launchAff_ $ (new (defaultState unit)) >>= evalStateT launchFlow

appFlow :: forall a. Flow a Unit
appFlow = do
  _ <- initUI
  _ <- Home.homeFlow
  pure unit

