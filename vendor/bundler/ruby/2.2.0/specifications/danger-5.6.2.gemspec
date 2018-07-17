# -*- encoding: utf-8 -*-
# stub: danger 5.6.2 ruby lib

Gem::Specification.new do |s|
  s.name = "danger"
  s.version = "5.6.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Orta Therox", "Juanito Fatas"]
  s.date = "2018-05-31"
  s.description = "Stop Saying 'You Forgot To\u{2026}' in Code Review"
  s.email = ["orta.therox@gmail.com", "katehuang0320@gmail.com"]
  s.executables = ["danger"]
  s.files = ["bin/danger"]
  s.homepage = "https://github.com/danger/danger"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0")
  s.rubygems_version = "2.4.5.1"
  s.summary = "Like Unit Tests, but for your Team Culture."

  s.installed_by_version = "2.4.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<claide>, ["~> 1.0"])
      s.add_runtime_dependency(%q<claide-plugins>, [">= 0.9.2"])
      s.add_runtime_dependency(%q<git>, ["~> 1"])
      s.add_runtime_dependency(%q<colored2>, ["~> 3.1"])
      s.add_runtime_dependency(%q<faraday>, ["~> 0.9"])
      s.add_runtime_dependency(%q<faraday-http-cache>, ["~> 1.0"])
      s.add_runtime_dependency(%q<octokit>, ["~> 4.7"])
      s.add_runtime_dependency(%q<kramdown>, ["~> 1.5"])
      s.add_runtime_dependency(%q<terminal-table>, ["~> 1"])
      s.add_runtime_dependency(%q<cork>, ["~> 0.1"])
      s.add_runtime_dependency(%q<no_proxy_fix>, [">= 0"])
    else
      s.add_dependency(%q<claide>, ["~> 1.0"])
      s.add_dependency(%q<claide-plugins>, [">= 0.9.2"])
      s.add_dependency(%q<git>, ["~> 1"])
      s.add_dependency(%q<colored2>, ["~> 3.1"])
      s.add_dependency(%q<faraday>, ["~> 0.9"])
      s.add_dependency(%q<faraday-http-cache>, ["~> 1.0"])
      s.add_dependency(%q<octokit>, ["~> 4.7"])
      s.add_dependency(%q<kramdown>, ["~> 1.5"])
      s.add_dependency(%q<terminal-table>, ["~> 1"])
      s.add_dependency(%q<cork>, ["~> 0.1"])
      s.add_dependency(%q<no_proxy_fix>, [">= 0"])
    end
  else
    s.add_dependency(%q<claide>, ["~> 1.0"])
    s.add_dependency(%q<claide-plugins>, [">= 0.9.2"])
    s.add_dependency(%q<git>, ["~> 1"])
    s.add_dependency(%q<colored2>, ["~> 3.1"])
    s.add_dependency(%q<faraday>, ["~> 0.9"])
    s.add_dependency(%q<faraday-http-cache>, ["~> 1.0"])
    s.add_dependency(%q<octokit>, ["~> 4.7"])
    s.add_dependency(%q<kramdown>, ["~> 1.5"])
    s.add_dependency(%q<terminal-table>, ["~> 1"])
    s.add_dependency(%q<cork>, ["~> 0.1"])
    s.add_dependency(%q<no_proxy_fix>, [">= 0"])
  end
end
