# -*- encoding: utf-8 -*-
# stub: cork 0.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "cork"
  s.version = "0.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Karla Sandoval", "Orta Therox"]
  s.date = "2017-04-11"
  s.email = ["k.isabel.sandoval@gmail.com", "orta.therox@gmail.com"]
  s.homepage = "https://github.com/CocoaPods/Cork"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0")
  s.rubygems_version = "2.4.5.1"
  s.summary = "A delightful CLI UI module."

  s.installed_by_version = "2.4.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<colored2>, ["~> 3.1"])
      s.add_development_dependency(%q<bundler>, ["~> 1.3"])
      s.add_development_dependency(%q<rake>, [">= 10.0"])
      s.add_development_dependency(%q<bacon>, ["~> 1.1"])
    else
      s.add_dependency(%q<colored2>, ["~> 3.1"])
      s.add_dependency(%q<bundler>, ["~> 1.3"])
      s.add_dependency(%q<rake>, [">= 10.0"])
      s.add_dependency(%q<bacon>, ["~> 1.1"])
    end
  else
    s.add_dependency(%q<colored2>, ["~> 3.1"])
    s.add_dependency(%q<bundler>, ["~> 1.3"])
    s.add_dependency(%q<rake>, [">= 10.0"])
    s.add_dependency(%q<bacon>, ["~> 1.1"])
  end
end
