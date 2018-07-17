# -*- encoding: utf-8 -*-
# stub: danger-plugin-api 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "danger-plugin-api"
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Orta Therox"]
  s.bindir = "exe"
  s.date = "2016-08-25"
  s.description = "An empty gem, which provides a SemVer link for the Danger plugin API."
  s.email = ["orta.therox@gmail.com"]
  s.homepage = "https://github.com/danger/danger-plugin-api"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.5.1"
  s.summary = "An empty gem, which provides a SemVer link for the Danger plugin API."

  s.installed_by_version = "2.4.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<danger>, ["> 2.0"])
      s.add_development_dependency(%q<bundler>, ["~> 1.12"])
      s.add_development_dependency(%q<rake>, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>, ["~> 3.0"])
    else
      s.add_dependency(%q<danger>, ["> 2.0"])
      s.add_dependency(%q<bundler>, ["~> 1.12"])
      s.add_dependency(%q<rake>, ["~> 10.0"])
      s.add_dependency(%q<rspec>, ["~> 3.0"])
    end
  else
    s.add_dependency(%q<danger>, ["> 2.0"])
    s.add_dependency(%q<bundler>, ["~> 1.12"])
    s.add_dependency(%q<rake>, ["~> 10.0"])
    s.add_dependency(%q<rspec>, ["~> 3.0"])
  end
end
