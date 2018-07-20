# -*- encoding: utf-8 -*-
# stub: claide-plugins 0.9.2 ruby lib

Gem::Specification.new do |s|
  s.name = "claide-plugins"
  s.version = "0.9.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["David Grandinetti", "Olivier Halligon"]
  s.date = "2016-10-02"
  s.description = "                         This CLAide plugin shows information about all available CLAide plugins\n                         (yes, this is very meta!).\n                         This plugin adds the \"plugins\" subcommand to a binary so that you can list\n                         all plugins (registered in the reference JSON hosted at CocoaPods/cocoapods-plugins)\n"
  s.homepage = "https://github.com/cocoapods/claide-plugins"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0")
  s.rubygems_version = "2.4.5.1"
  s.summary = "CLAide plugin which shows info about available CLAide plugins."

  s.installed_by_version = "2.4.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<nap>, [">= 0"])
      s.add_runtime_dependency(%q<cork>, [">= 0"])
      s.add_runtime_dependency(%q<open4>, ["~> 1.3"])
      s.add_development_dependency(%q<bundler>, ["~> 1.3"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<pry>, [">= 0"])
    else
      s.add_dependency(%q<nap>, [">= 0"])
      s.add_dependency(%q<cork>, [">= 0"])
      s.add_dependency(%q<open4>, ["~> 1.3"])
      s.add_dependency(%q<bundler>, ["~> 1.3"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<pry>, [">= 0"])
    end
  else
    s.add_dependency(%q<nap>, [">= 0"])
    s.add_dependency(%q<cork>, [">= 0"])
    s.add_dependency(%q<open4>, ["~> 1.3"])
    s.add_dependency(%q<bundler>, ["~> 1.3"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<pry>, [">= 0"])
  end
end
