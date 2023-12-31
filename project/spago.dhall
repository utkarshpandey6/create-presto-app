{ name = "hyper-widget"
, dependencies =
  [ "aff"
  , "arrays"
  , "avar"
  , "console"
  , "control"
  , "datetime"
  , "debug"
  , "effect"
  , "either"
  , "enums"
  , "exceptions"
  , "foldable-traversable"
  , "foreign"
  , "foreign-generic"
  , "foreign-object"
  , "functions"
  , "halogen-vdom"
  , "integers"
  , "js-date"
  , "js-timers"
  , "lists"
  , "maybe"
  , "newtype"
  , "nonempty"
  , "now"
  , "numbers"
  , "ordered-collections"
  , "partial"
  , "prelude"
  , "presto-dom"
  , "presto"
  , "tracker"
  , "purescript-stack"
  , "record"
  , "refs"
  , "strings"
  , "transformers"
  , "tuples"
  , "unfoldable"
  , "unsafe-coerce"
  , "web-events"
  , "hyrule"
  , "web-html"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
