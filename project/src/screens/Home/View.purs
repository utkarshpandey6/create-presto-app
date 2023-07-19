module Home.View where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Home.Controller (eval, mkInitialState)
import Home.Types (Action(..), ScreenInput, ScreenOutput, State)
import PrestoDOM (Gravity(..), Length(..), Margin(..), Orientation(..), Padding(..), PrestoDOM, ScopedScreen, backgroundColor, color, gravity, height, imageView, linearLayout, margin, onBackPressed, onClick, orientation, padding, text, textSize, textView, url, weight, width)
import PrestoDOM.Animation as PrestoAnim
import Utils.Utils (href)

screen :: ScreenInput -> ScopedScreen Action State ScreenOutput
screen input = do
    { initialState : (mkInitialState input)
    , name : "Home"
    , view
    , globalEvents : []
    , eval : eval
    , parent : Nothing
    }

view :: forall w. (Action -> Effect Unit) -> State -> PrestoDOM (Effect Unit) w
view push _ =
    linearLayout
        [
            width MATCH_PARENT,
            height MATCH_PARENT,
            orientation VERTICAL,
            backgroundColor "#222428",
            gravity CENTER,
            onBackPressed push $ const OnBackPress
        ]
        [
            linearLayout [
                width WRAP_CONTENT,
                height $ V 0,
                weight 1.0,
                gravity CENTER,
                orientation VERTICAL
            ] [ PrestoAnim.animationSet
                    [ PrestoAnim.Animation
                        [ PrestoAnim.duration 2000
                        , PrestoAnim.toRotation 360
                        , PrestoAnim.repeatCount PrestoAnim.Infinite
                        ] true
                    ] $ imageView [
                        height $ V 150,
                        width $ V 150,
                        margin $ Margin 0 0 0 100,
                        url "https://files.readme.io/5385a9c-white-logo.png"
                    ],
                textView [
                    text "Presto DOM",
                    color "#ffffff",
                    textSize 80
                ],
                textView [
                    text "Edit src/screens/Home/View.purs to change the screen",
                    color "#ffffff",
                    textSize 18,
                    margin $ Margin 0 60 0 0
                ]
            ],
            textView [
                padding $ Padding 0 30 0 30,
                text "Powered By Juspay",
                color "#ffffff",
                onClick href (\_ -> "https://juspay.in"),
                textSize 20
            ]
        ]

